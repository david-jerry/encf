from telnetlib import ENCRYPT

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.flatpages import views as flatpage_views
from django.contrib.flatpages.sitemaps import FlatPageSitemap
from django.contrib.sitemaps.views import sitemap
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path
from django.views import defaults as default_views
from django.views.generic import TemplateView

from config.sitemaps import StaticViewSitemap
from encryptfinance.management.views import home

sitemaps = {
    "static": StaticViewSitemap,
}

urlpatterns = [
    path("", home, name="home"),
    path('ref=<username>/', home, name='ref-home'),
    path(
        "about/", TemplateView.as_view(template_name="pages/about.html"), name="about"
    ),
    path("dashboard/mt5-webtrader/", TemplateView.as_view(template_name="users/mt5.html"), name="mt5"),
    path("dashboard/", TemplateView.as_view(template_name="users/dashboard.html"), name="dashboard"),

    # Django Admin, use {% url 'admin:index' %}
    path('jet/', include('jet.urls', 'jet')),
    path('jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    path("admin/", include("admin_honeypot.urls", namespace="admin_honeypot")),
    path(settings.ADMIN_URL, admin.site.urls),
    path(settings.ADMIN_DOC_URL, include("django.contrib.admindocs.urls")),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    # User management
    path("users/", include("encryptfinance.users.urls", namespace="users")),
    path("transactions/", include("encryptfinance.wallet.urls", namespace="transactions")),
    path("management/", include("encryptfinance.management.urls", namespace="core")),
    
    
    path("accounts/", include("allauth.urls")),
    # Your stuff: custom urls includes go here
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# flatpages
if flatpage_views:
    urlpatterns += [
        path("terms/", flatpage_views.flatpage, {"url":"/terms/"}, name="terms"),
        path("cookies/", flatpage_views.flatpage, {"url":"/cookies/"}, name="cookies"),
        path("privacy/", flatpage_views.flatpage, {"url":"/privacy/"}, name="privacy"),
    ]

urlpatterns += [
    path("sitemap.xml/", sitemap, kwargs={"sitemaps": sitemaps}, name="sitemap"),
    path(
        "robots.txt/",
        TemplateView.as_view(template_name="robots.txt", content_type="text/plain"),
        name="robots",
    ),
]

if settings.DEBUG:
    # Static file serving when using Gunicorn + Uvicorn for local web socket development
    urlpatterns += staticfiles_urlpatterns()


if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns


admin.site.site_header = "ENCRYPTFINANCE DASHBOARD"
admin.site.site_title = f"ADMINISTRATOR DASHBOARD"
admin.site.index_title = f"ADMINISTRATOR DASHBOARD"
