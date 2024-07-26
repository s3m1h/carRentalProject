package ksu.bitirmeserver.utilities;

import ksu.bitirmeserver.exception.PhotoRetrievalException;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

public class BlobUtil {
    private BlobUtil() {
        // Util sınıfının örneğinin oluşturulmasını engellemek için private yapıcı
    }
    // verilen bir byte dizisini temel alarak yeni bir SerialBlob nesnesi oluşturur.
    public static SerialBlob newSerialBlob(byte[] photoBytes) throws SQLException {
        if(photoBytes != null && photoBytes.length > 0){
            return new SerialBlob(photoBytes);
        }
        return null;
    }
    public static Blob photoToBlob(MultipartFile file) throws IOException, SQLException {
        if (!file.isEmpty()) {
            byte[] photoBytes = file.getBytes();
            return newSerialBlob(photoBytes);
        }
        return null;
    }
    //  bu fonksiyonun amacı, bir Blob nesnesinden fotoğraf verisini byte dizisi olarak almak
    public static byte[] getPhotoDataFromBlob(Blob photoBlob) throws SQLException {
        byte[] photoBytes = null;
        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Error retrieving photo "+ e);
            } finally {
                // Blob nesnesini kapat
                if (photoBlob != null) {
                    try {
                        photoBlob.free();
                    } catch (SQLException e) {
                        // Kapatma hatası ele al
                        System.err.println("Error closing Blob: " + e.getMessage());
                    }
                }
            }
        }
        return photoBytes;
    }
    //  byte dizisi olarak temsil edilen bir fotoğraf verisini Base64 formatında bir String'e dönüştürmektir.
    public static String base64BlobToString(byte[] photoBytes) {
        if (photoBytes != null && photoBytes.length > 0) {
            return Base64.encodeBase64String(photoBytes);
        }
        return null;
    }

}
