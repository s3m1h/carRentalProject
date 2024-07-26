package ksu.bitirmeserver.exception;

public class RentalNotFoundException extends RuntimeException {
    public RentalNotFoundException(String message){
        super(message);
    }
}
