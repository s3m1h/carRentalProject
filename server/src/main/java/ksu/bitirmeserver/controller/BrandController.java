package ksu.bitirmeserver.controller;

import jakarta.validation.Valid;
import ksu.bitirmeserver.dtos.request.CreateBrandRequest;
import ksu.bitirmeserver.dtos.request.UpdateBrandRequest;
import ksu.bitirmeserver.dtos.response.BrandListResponse;
import ksu.bitirmeserver.dtos.response.GetByIdBrandResponse;
import ksu.bitirmeserver.model.Brand;
import ksu.bitirmeserver.service.BrandService;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController // annotation
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;

    @PostMapping("/add")
    public void addNewBrand(@RequestBody @Valid CreateBrandRequest createBrandRequest){
        brandService.add(createBrandRequest);
    }
    @GetMapping
    public DataResult<List<BrandListResponse>> getAllBrands(){
        return brandService.getAll();
    }

    @GetMapping("/brand/{brandID}")
    public ResponseEntity<Optional<GetByIdBrandResponse>> getBrandById(@PathVariable("brandID") Long id){
        return ResponseEntity.ok(brandService.getById(id));
    }
    @PutMapping("/update/{brandID}")
    public Result updateBrand(@PathVariable("brandID") Long id,@RequestBody @Valid UpdateBrandRequest updateBrandRequest){
        Result result = brandService.update(id, updateBrandRequest);
        if(result.isSuccess()) return result;
        return null;
    }
    @DeleteMapping("/delete/{brandID}")
    public Result deleteBrand(@PathVariable("brandID") Long id){
        Result result = brandService.delete(id);
        if(result.isSuccess()) return result;
        return null;
    }


}
