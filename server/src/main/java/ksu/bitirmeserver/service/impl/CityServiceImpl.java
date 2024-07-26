package ksu.bitirmeserver.service.impl;

import ksu.bitirmeserver.dtos.request.CreateCityRequest;
import ksu.bitirmeserver.dtos.request.UpdateCityRequest;
import ksu.bitirmeserver.dtos.response.CityListResponse;
import ksu.bitirmeserver.dtos.response.GetByIdCityResponse;
import ksu.bitirmeserver.model.City;
import ksu.bitirmeserver.repository.CityRepository;
import ksu.bitirmeserver.service.CityService;
import ksu.bitirmeserver.utilities.mappers.ModelMapperService;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;
import ksu.bitirmeserver.utilities.results.SuccessDataResult;
import ksu.bitirmeserver.utilities.results.SuccessResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {
    private final CityRepository cityRepository;
    private final ModelMapperService modelMapperService;
    @Override
    public Result add(CreateCityRequest createCityRequest) {
        City city = modelMapperService.forRequest().map(createCityRequest, City.class);
        //city.setId(0L);
        cityRepository.save(city);
        return new SuccessResult();
    }

    @Override
    public DataResult<List<CityListResponse>> getAll() {
        List<City> cityList = cityRepository.findAll();
        List<CityListResponse> cityListResponses = cityList.stream().map(city -> modelMapperService.forResponse().map(city, CityListResponse.class)).collect(Collectors.toList());
        return new SuccessDataResult<>(cityListResponses);
    }

    @Override
    public DataResult<GetByIdCityResponse> getById(Long cityId) {
        City city = cityRepository.findById(cityId).orElseThrow();
        GetByIdCityResponse getByIdCityResponse = modelMapperService.forResponse().map(city, GetByIdCityResponse.class);
        return new SuccessDataResult<>(getByIdCityResponse);
    }

    @Override
    public Result update(Long id, UpdateCityRequest updateCityRequest) {
        City city = cityRepository.findById(id).orElseThrow();
        city.setName(updateCityRequest.getCityName());
        cityRepository.save(city);
        return new SuccessResult();
    }

    @Override
    public Result delete(Long id) {
        City city = cityRepository.findById(id).orElseThrow();
        cityRepository.delete(city);
        return new SuccessResult();
    }

    @Override
    public City findByCityName(String cityName) {
        return cityRepository.findByName(cityName);
    }
}
