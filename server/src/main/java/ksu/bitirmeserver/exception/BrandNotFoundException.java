package ksu.bitirmeserver.exception;

public class BrandNotFoundException extends RuntimeException {
    public BrandNotFoundException(String messages) {
        super(messages);
    }
}
