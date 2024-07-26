package ksu.bitirmeserver.controller;

import jakarta.validation.Valid;
import ksu.bitirmeserver.dtos.request.CreateColorRequest;
import ksu.bitirmeserver.dtos.request.UpdateColorRequest;
import ksu.bitirmeserver.dtos.response.ColorListResponse;
import ksu.bitirmeserver.dtos.response.GetByIdColorResponse;
import ksu.bitirmeserver.service.ColorService;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colors")
@RequiredArgsConstructor
public class ColorController {
    private final ColorService colorService;
    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Result addColor(@RequestBody @Valid CreateColorRequest colorRequest){
        Result result = colorService.add(colorRequest);
        if(result.isSuccess()) return result;
        return null;
    }
    @GetMapping
    public DataResult<List<ColorListResponse>> getAllColor(){
        DataResult<List<ColorListResponse>> result = colorService.getAll();
        if(result.isSuccess()) return result;
        return null;
    }
    @GetMapping("/color/{colorID}")
    public DataResult<GetByIdColorResponse> getColorById(@PathVariable("colorID") Long id){
        return colorService.getById(id);
    }
    @PutMapping("/update/{colorID}")
    public Result updateColor(@PathVariable("colorID") Long id, @RequestBody @Valid UpdateColorRequest colorRequest){
        Result result =  colorService.update(id,colorRequest);
        if (result.isSuccess()) return result;
        return null;
    }
    @DeleteMapping("/delete/{colorID}")
    public Result deleteColor(@PathVariable("colorID") Long id){
       Result result =  colorService.delete(id);
       if(result.isSuccess()) return result;
       return null;
    }
}
