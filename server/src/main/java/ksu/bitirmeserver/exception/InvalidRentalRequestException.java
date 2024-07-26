package ksu.bitirmeserver.exception;

public class InvalidRentalRequestException extends RuntimeException {
    public InvalidRentalRequestException(String message) {
        super(message);
    }
}
