package ksu.bitirmeserver.utilities.exceptions;

import ksu.bitirmeserver.utilities.exceptions.ProblemDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidationProblemDetails extends ProblemDetails {
	private Map<String, String> validationErrors;
}
