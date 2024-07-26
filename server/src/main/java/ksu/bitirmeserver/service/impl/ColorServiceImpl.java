package ksu.bitirmeserver.service.impl;

import ksu.bitirmeserver.constants.Messages;
import ksu.bitirmeserver.dtos.request.CreateColorRequest;
import ksu.bitirmeserver.dtos.request.UpdateColorRequest;
import ksu.bitirmeserver.dtos.response.ColorListResponse;
import ksu.bitirmeserver.dtos.response.GetByIdColorResponse;
import ksu.bitirmeserver.exception.ColorNotFoundException;
import ksu.bitirmeserver.exception.ResourceNotFoundException;
import ksu.bitirmeserver.model.Color;
import ksu.bitirmeserver.repository.ColorRepository;
import ksu.bitirmeserver.service.ColorService;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;
import ksu.bitirmeserver.utilities.results.SuccessDataResult;
import ksu.bitirmeserver.utilities.results.SuccessResult;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.message.Message;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ColorServiceImpl implements ColorService {
    private final ColorRepository colorRepository;
    @Override
    public Result add(CreateColorRequest createColorRequest) {
        Color color = new Color();
        color.setName(createColorRequest.getColorName());
        color.setColorHex(createColorRequest.getColorHex());
        colorRepository.save(color);
        return new SuccessResult("Ekleme işlemi başarılı bir şekilde gerçekleşti..");
    }

    @Override
    public DataResult<List<ColorListResponse>> getAll() {
        List<Color> colors = colorRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        List<ColorListResponse> colorListResponses = new ArrayList<>();
        for(Color color: colors){
            ColorListResponse colorListResponse = getColorResponse(color);
            colorListResponses.add(colorListResponse);
        }
        return new SuccessDataResult<>(colorListResponses);
    }

    @Override
    public DataResult<GetByIdColorResponse> getById(Long id) {
        Optional<Color> color = colorRepository.findById(id);
        GetByIdColorResponse getByIdColorResponse = new GetByIdColorResponse();
        getByIdColorResponse.setColorName(color.get().getName());
        return new SuccessDataResult<>(getByIdColorResponse);
    }

    @Override
    public Result update(Long id, UpdateColorRequest updateColorRequest) {
        Color color = colorRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Color bulunamdı"));
        color.setName(updateColorRequest.getColorName());
        color.setColorHex(updateColorRequest.getColorHex());
        colorRepository.save(color);
        return new SuccessResult(Messages.ColorMessages.DATA_UPDATED_SUCCESSFULLY);
    }

    @Override
    public Result delete(Long id) {
        checkIsExistsByColorId(id);
        colorRepository.deleteById(id);
        return new SuccessResult(Messages.ColorMessages.DATA_DELETED_SUCCESSFULLY);
    }

    public void checkIsExistsByColorId(Long id) {
        if(!colorRepository.existsById(id)){
            throw new ColorNotFoundException(Messages.ColorMessages.COLOR_ID_NOT_FOUND);
        }
    }

    @Override
    public Color findByColorId(Long colorId) {
        checkIsExistsByColorId(colorId);
        return colorRepository.findById(colorId).get();
    }

    @Override
    public Color findByColorName(String colorName) {
        return colorRepository.findByName(colorName);
    }

    private ColorListResponse getColorResponse(Color color) {
        return new ColorListResponse(color.getId(), color.getName(), color.getColorHex());
    }
}
