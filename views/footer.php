<?php
$ci_data = $this->Main_model->get("studiomob");
?>
<!-- ======= Footer ======= -->
<footer id="footer">
    <div class="footer-top">
        <div class="container">
            <div class="row">

                <div class="col-lg-3 col-md-6">
                    <div class="footer-info">
                        <h3><?=$ci_data['company']?></h3>
                        <p> <span style="word-break: break-all"> <?=$ci_data['address']?></span><br>
                            <strong>Phone:</strong> <?=$ci_data['phone']?><br>
                            <strong>Email:</strong> <?=$ci_data['email']?><br>
                        </p>
                        <div class="social-links mt-3">
                            <a href="<?=$ci_data['Twitter']?>" class="twitter"><i class="bx bxl-twitter"></i></a>
                            <a href="<?=$ci_data['Facebook']?>" class="facebook"><i class="bx bxl-facebook"></i></a>
                            <a href="<?=$ci_data['Instagram']?>" class="instagram"><i class="bx bxl-instagram"></i></a>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 footer-links" style="margin-left: 10%; ">
                    <h4>Useful Links</h4>
                    <ul>
                        <li><i class="bx bx-chevron-right"></i> <a href="/">Home</a></li>
<!--                        <li><i class="bx bx-chevron-right"></i> <a href="#">About us</a></li>-->
                        <li><i class="bx bx-chevron-right"></i> <a href="/contents/">Works</a></li>
                        <li><i class="bx bx-chevron-right"></i> <a href="/service/">Services</a></li>
                        <li><i class="bx bx-chevron-right"></i> <a href="/contact/">Contact</a></li>
                    </ul>
                </div>

                <div class="col-lg-4 col-md-6 footer-links">
                    <h4>Our Services</h4>
                    <ul>
                        <li><i class="bx bx-chevron-right"></i> <a href="/service/#services">건축설계</a></li>
                        <li><i class="bx bx-chevron-right"></i> <a href="/service/#services">개발기획</a></li>
                        <li><i class="bx bx-chevron-right"></i> <a href="/service/#services">도시디자인</a></li>
                        <li><i class="bx bx-chevron-right"></i> <a href="/service/#services">연구용역</a></li>
                        <li><i class="bx bx-chevron-right"></i> <a href="/service/#services">해외사업</a></li>
                        <li><i class="bx bx-chevron-right"></i> <a href="/service/#services">건축감리</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="copyright">
            &copy; Copyright <strong><span><?=$ci_data['copyright']?></span></strong>. All Rights Reserved
        </div>

    </div>
</footer><!-- End Footer -->

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->
<script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="/assets/vendor/glightbox/js/glightbox.min.js"></script>
<script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
<script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
<script src="/assets/vendor/waypoints/noframework.waypoints.js"></script>
<script src="/assets/vendor/php-email-form/validate.js"></script>

<!-- Template Main JS File -->
<script src="/assets/js/main.js"></script>

</body>

</html>