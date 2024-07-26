import React from 'react';

const PageNotFound404 = () => {
    return (
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"> <span class="text-danger">Opps!</span> Sayfa bulunamadı.</p>
                <p class="lead">
                    Aradığınız sayfa mevcut değil.
                </p>
                <a href="/" class="btn btn-primary">Ana sayfaya git</a>
            </div>
        </div>
    );
}

export default PageNotFound404;
