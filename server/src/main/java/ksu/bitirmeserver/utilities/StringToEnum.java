package ksu.bitirmeserver.utilities;

public class StringToEnum {
    public static <T extends Enum<T>> T fromString(Class<T> enumClass, String value) {
        for (T enumConstant : enumClass.getEnumConstants()) {
            if (enumConstant.name().equalsIgnoreCase(value.toUpperCase())) {
                return enumConstant;
            }
        }
        throw new IllegalArgumentException("Geçersiz enum değeri: " + value);
    }
}
