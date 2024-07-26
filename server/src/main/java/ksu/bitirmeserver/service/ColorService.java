package ksu.bitirmeserver.service;


import ksu.bitirmeserver.dtos.request.CreateColorRequest;
import ksu.bitirmeserver.dtos.request.UpdateColorRequest;
import ksu.bitirmeserver.dtos.response.ColorListResponse;
import ksu.bitirmeserver.dtos.response.GetByIdColorResponse;
import ksu.bitirmeserver.model.Color;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;


import java.util.List;

public interface ColorService {
    Result add(CreateColorRequest createColorRequest);
    DataResult<List<ColorListResponse>> getAll();
    DataResult<GetByIdColorResponse> getById(Long id);
    Result update(Long id, UpdateColorRequest updateColorRequest);
    Result delete(Long id);
    void checkIsExistsByColorId(Long id);
    Color findByColorId(Long colorId);
    Color findByColorName(String colorName);
}
