<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <router-link class="navbar-brand ps-4" active-class="active" to="/admin/products">後台管理介面</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                    aria-controls="navbarText" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mb-2 mb-lg-0 w-100 justify-content-end pe-4">
                        <li class="nav-item">
                            <router-link class="nav-link" active-class="active" to="/admin/products">產品管理</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" active-class="active" to="/admin/products1">優惠卷管理</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" active-class="active" to="/admin/products2">訂單管理</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>
