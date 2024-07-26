package ksu.bitirmeserver.exception;

public class CarNotFoundException extends RuntimeException {
    public CarNotFoundException(String messages) {
        super(messages);
    }
}
