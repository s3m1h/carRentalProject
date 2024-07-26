package ksu.bitirmeserver.service;

import ksu.bitirmeserver.dtos.request.CreateBrandRequest;
import ksu.bitirmeserver.dtos.request.UpdateBrandRequest;
import ksu.bitirmeserver.dtos.response.BrandListResponse;
import ksu.bitirmeserver.dtos.response.GetByIdBrandResponse;
import ksu.bitirmeserver.model.Brand;
import ksu.bitirmeserver.model.Car;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;


import java.util.List;
import java.util.Optional;

public interface BrandService {
    Result add(CreateBrandRequest createBrandRequest);
    DataResult<List<BrandListResponse>> getAll();
    Optional<GetByIdBrandResponse> getById(Long id);
    Result update(Long id, UpdateBrandRequest updateBrandRequest);
    Result delete(Long id);
    void checkIsExistsByBrandId(Long id);
    Brand findByBrandId(Long brandId);
    Brand findByBrandName(String brandName);
}
