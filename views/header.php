<!DOCTYPE html>
<html lang="ko">
<?php
$uri = $_SERVER['REQUEST_URI'];
?>
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>Photographers</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link href="/assets/img/favicon.png" rel="icon">
    <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="/assets/vendor/animate.css/animate.min.css" rel="stylesheet">
    <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet">
    <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

    <meta property="og:title" content="Photographers">
    <meta property="og:type" content="website">
    <meta property="og:image" content="">
    <meta property="og:description" content="Photographers">
    <title>Photographers</title>
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    <!-- Template Main CSS File -->
    <link href="/assets/css/style.css" rel="stylesheet">
</head>

<body>

<!-- ======= Header ======= -->
<header id="header" class="fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center">

        <h1 class="logo me-auto"><a href="/">Photographers</a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html" class="logo me-auto"><img src="/assets/img/logo.png" alt="" class="img-fluid"></a>-->

        <nav id="navbar" class="navbar">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about/">About</a></li>
                <li class="dropdown" ><a href="/contents/"><span>Works</span> <i class="bi bi-chevron-down"></i></a>
                    <ul>
                        <li><a href="/contents/"><span>ALL</span></a></li>
                                <li class="dropdown"><a href="/contents/?ccode=2"><span></span><i class="bi bi-chevron-right"></i></a>
                                    <ul>
                                        <li><a href="/contents/?ccode=1"><span>aaaaaa</span></a></li>
                                    </ul>
                                </li>
                    </ul>
                </li>
                <li><a href="/service/">Services</a></li>
<!--                <li><a href="pricing.html">Pricing</a></li>-->
<!--                <li><a href="blog.html">Blog</a></li>-->
                <li><a href="/contact/" style='color: #60d923' >Contact</a></li>
<!--                <li><a href="index.html" class="getstarted">Get Started</a></li>-->
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
        </nav><!-- .navbar -->

    </div>
</header><!-- End Header -->