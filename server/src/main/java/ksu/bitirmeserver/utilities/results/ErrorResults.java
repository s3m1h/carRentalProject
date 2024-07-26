package ksu.bitirmeserver.utilities.results;

public class ErrorResults extends Result{

	public ErrorResults(String message) {
		super(false, message);
		
	}
	public ErrorResults() {
		super(false);
		
	}
}
