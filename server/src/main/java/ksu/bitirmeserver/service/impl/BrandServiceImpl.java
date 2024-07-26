package ksu.bitirmeserver.service.impl;

import ksu.bitirmeserver.constants.Messages;
import ksu.bitirmeserver.dtos.request.CreateBrandRequest;
import ksu.bitirmeserver.dtos.request.UpdateBrandRequest;
import ksu.bitirmeserver.dtos.response.BrandListResponse;

import ksu.bitirmeserver.dtos.response.GetByIdBrandResponse;
import ksu.bitirmeserver.exception.BrandNotFoundException;
import ksu.bitirmeserver.exception.ResourceNotFoundException;
import ksu.bitirmeserver.model.Brand;
import ksu.bitirmeserver.repository.BrandRepository;
import ksu.bitirmeserver.service.BrandService;
import ksu.bitirmeserver.utilities.results.*;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;
    @Override
    public Result add(CreateBrandRequest createBrandRequest) {
        Brand brand = new Brand();
        brand.setName(createBrandRequest.getBrandName());
        brandRepository.save(brand);
        return new SuccessResult(Messages.BrandMessages.DATA_ADDED_SUCCESSFULLY);
    }

    @Override
    public DataResult<List<BrandListResponse>> getAll() {
        List<Brand> brands = brandRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        List<BrandListResponse> brandListResponses = new ArrayList<>();
        for(Brand brand : brands){
            BrandListResponse listResponse = getBrandResponse(brand);
            brandListResponses.add(listResponse);
        }
        return new SuccessDataResult<>(brandListResponses);
    }

    @Override
    public Optional<GetByIdBrandResponse> getById(Long id) {
        Optional<Brand>  brand = brandRepository.findById(id);
        GetByIdBrandResponse getByIdBrandResponse = new GetByIdBrandResponse();
        getByIdBrandResponse.setBrandName(brand.get().getName());
        return Optional.of(getByIdBrandResponse);
    }

    @Override
    public Result update(Long id, UpdateBrandRequest updateBrandRequest) {
        Brand brand = brandRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Brand bulunamadi."));
        brand.setName(updateBrandRequest.getBrandName());
        brandRepository.save(brand);
        return new SuccessResult(Messages.BrandMessages.DATA_UPDATED_SUCCESSFULLY);
    }

    @Override
    public Result delete(Long id) {
        checkIsExistsByBrandId(id);
        brandRepository.deleteById(id);
        return new SuccessResult(Messages.BrandMessages.DATA_DELETED_SUCCESSFULLY);
    }

    public void checkIsExistsByBrandId(Long id) {
        if(!brandRepository.existsById(id)){
            throw new BrandNotFoundException(Messages.BrandMessages.BRAND_ID_NOT_FOUND);
        }
    }


    @Override
    public Brand findByBrandId(Long brandId) {
        checkIsExistsByBrandId(brandId);
        return brandRepository.findById(brandId).get();
    }

    @Override
    public Brand findByBrandName(String brandName) {
        return brandRepository.findByName(brandName);
    }

    private BrandListResponse getBrandResponse(Brand brand) {
        return new BrandListResponse(
                brand.getId(),
                brand.getName()
        );
    }
}
