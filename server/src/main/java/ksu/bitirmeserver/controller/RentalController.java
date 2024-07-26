package ksu.bitirmeserver.controller;

import jakarta.validation.Valid;
import ksu.bitirmeserver.dtos.request.CreateCarRentalRequest;
import ksu.bitirmeserver.dtos.response.CarRentalListResponse;
import ksu.bitirmeserver.service.RentalService;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequiredArgsConstructor
@RequestMapping("/api/rentals")

public class RentalController {
    private final RentalService rentalService;

    @PostMapping
    public Result addRental(@RequestBody @Valid CreateCarRentalRequest rentalRequest){
        Result result = rentalService.add(rentalRequest);
        if(result.isSuccess()) return result;
        return null;
    }
    @GetMapping
    public DataResult<List<CarRentalListResponse>> getAllRentals(){
        DataResult<List<CarRentalListResponse>> result =  rentalService.getAll();
        if(result.isSuccess()) return result;
        return null;

    }
    @GetMapping("/user/{email}")
    public DataResult<List<CarRentalListResponse>> getRentalsByUserEmail(@PathVariable String email){
        DataResult<List<CarRentalListResponse>> result = rentalService.getRentalsByUserEmail(email);
        if(result.isSuccess()) return result;
        return null;
    }
}
