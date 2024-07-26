package ksu.bitirmeserver.service;

import ksu.bitirmeserver.dtos.request.CreateCityRequest;
import ksu.bitirmeserver.dtos.request.UpdateCityRequest;
import ksu.bitirmeserver.dtos.response.CityListResponse;
import ksu.bitirmeserver.dtos.response.GetByIdCityResponse;
import ksu.bitirmeserver.model.City;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;

import java.util.List;

public interface CityService {
    Result add(CreateCityRequest createCityRequest);
    DataResult<List<CityListResponse>> getAll();
    DataResult<GetByIdCityResponse> getById(Long cityId);
    Result update(Long id, UpdateCityRequest updateCityRequest);
    Result delete(Long id);
    City findByCityName(String cityName);
}
