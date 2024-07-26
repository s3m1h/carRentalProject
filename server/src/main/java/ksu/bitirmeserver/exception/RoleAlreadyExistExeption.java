package ksu.bitirmeserver.exception;

public class RoleAlreadyExistExeption extends RuntimeException {
    public RoleAlreadyExistExeption(String messages) {
        super(messages);
    }
}
