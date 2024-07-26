package ksu.bitirmeserver.controller;



import jakarta.validation.Valid;
import ksu.bitirmeserver.dtos.request.CreateCityRequest;
import ksu.bitirmeserver.dtos.request.UpdateCityRequest;
import ksu.bitirmeserver.dtos.response.CityListResponse;
import ksu.bitirmeserver.dtos.response.GetByIdCityResponse;
import ksu.bitirmeserver.service.CityService;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cities")
public class CityController {
    private final CityService cityService;

    @PostMapping
    public Result addCity(@RequestBody @Valid CreateCityRequest createCityRequest){
        Result result = cityService.add(createCityRequest);
        if(result.isSuccess()){
            return result;
        }
        return null;
    }

    @GetMapping
    public DataResult<List<CityListResponse>> getAllCities(){
        DataResult<List<CityListResponse>> listDataResult = cityService.getAll();
        return listDataResult;
    }
    @GetMapping("/{cityId}")
    public DataResult<GetByIdCityResponse> getByCityId(@PathVariable("cityId") Long id){
        DataResult<GetByIdCityResponse> result = cityService.getById(id);
        if(result.isSuccess()){
            return result;
        }
        return null;
    }
    @PutMapping("/{cityId}")
    public Result updateCity(@PathVariable("cityId") Long id, @RequestBody @Valid UpdateCityRequest updateCityRequest){
        Result result = cityService.update(id,updateCityRequest);
        if(result.isSuccess()){
            return result;
        }
        return null;
    }
    @DeleteMapping("{cityId}")
    public Result deleteCity(@PathVariable("cityId") Long id){
        Result result = cityService.delete(id);
        if(result.isSuccess()){
            return result;
        }
        return null;
    }
}
