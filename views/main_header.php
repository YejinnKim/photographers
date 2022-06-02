<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>스튜디오엠오비</title>
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

    <meta property="og:title" content="Studio M.O.B">
    <meta property="og:type" content="website">
    <meta property="og:image" content="">
    <meta property="og:description" content="Studio M.O.B">
    <title>스튜디오 MOB</title>
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="/semantic/dist/semantic.min.css">
    <script src="/semantic/dist/semantic.min.js"></script>

    <!-- Template Main CSS File -->
    <link href="/assets/css/style.css" rel="stylesheet">

    <!-- =======================================================
    * Template Name: Sailor - v4.7.0
    * Template URL: https://bootstrapmade.com/sailor-free-bootstrap-theme/
    * Author: BootstrapMade.com
    * License: https://bootstrapmade.com/license/
    ======================================================== -->
</head>

<body>

<!-- ======= Header ======= -->
<header id="main_header" class="fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center">

        <h1 class="logo me-auto"><a href="/">Studio M.O.B</a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html" class="logo me-auto"><img src="/assets/img/logo.png" alt="" class="img-fluid"></a>-->

        <nav id="navbar" class="navbar">
            <ul>
                <li><a href="/" class="active">Home</a></li>
                <li><a href="/about/" >About</a></li>
                <?php
                //카테고리 설정 부분
                $ci_data = $this->Main_model->getCategory2();
                ?>
                <li class="dropdown" ><a href="/contents/"><span <?php if (strpos($uri, 'contents')) echo "style='color: #60d923'";?>>Works</span> <i class="bi bi-chevron-down"></i></a>
                    <ul>
                        <li><a href="/contents/"><span>ALL</span></a></li>
                        <?php for ($i=0;$i<count($ci_data);$i++){
                            $getCount = $this->Main_model->getCountCategory3($ci_data[$i]['fd_thread']);
                            //하위 데이터가 있을
                            if ($getCount > 0){
                                ?>
                                <li class="dropdown"><a href="/contents/?ccode=<?=$ci_data[$i]['fd_thread']?>"><span><?=$ci_data[$i]['fd_name']?></span><i class="bi bi-chevron-right"></i></a>
                                    <ul>
                                        <?php
                                        $getData = $this->Main_model->getDataCategory3($ci_data[$i]['fd_thread']);
                                        for ($x=0;$x<count($getData);$x++){
                                            ?>
                                            <li><a href="/contents/?ccode=<?=$getData[$x]['fd_thread']?>"><span><?=$getData[$x]['fd_name']?></span></a></li>
                                        <?php } ?>
                                    </ul>
                                </li>
                                <?php
                                //하위데이터가 없을
                            }else{ ?>
                                <li><a href="/contents/?ccode=<?=$ci_data[$i]['fd_thread']?>"><span><?=$ci_data[$i]['fd_name']?></span></a></li>
                            <?php }

                        } ?>
                    </ul>
                </li>
                <li><a href="/service/">Services</a></li>
                <!--                <li><a href="pricing.html">Pricing</a></li>-->
                <!--                <li><a href="blog.html">Blog</a></li>-->

                <li><a href="/contact/">Contact</a></li>
                <!--                <li><a href="index.html" class="getstarted">Get Started</a></li>-->
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
        </nav><!-- .navbar -->

    </div>
</header><!-- End Header -->