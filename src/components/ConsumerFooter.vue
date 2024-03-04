<template>
    <footer>
        <div class="footerContainer object-fit-cover position-relative" style="height: 400px;">
            <div style="width: 400px;" class="footerContent position-absolute top-50 translate-middle-y me-5">
                <h1 class="text-hex fs-2 fw-bold mb-3">訂閱獲取貓咪相關資訊</h1>
                <div class="d-flex">
                    <input class="form-control text-truncate me-2" type="email" placeholder="Enter Your Email">
                    <button class="btn btn-primary text-white p-3 fs-6">Subscribe</button>
                </div>
            </div>
        </div>
    </footer>
</template>
<style>
.footerContainer {
  background-image: url('../assets/image/footer-cat.png');
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
}
.footerContent {
  max-width: 400px;
  right: 0;
}
</style>
