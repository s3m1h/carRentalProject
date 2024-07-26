package ksu.bitirmeserver.constants;

public class Messages {

    public class BrandMessages{
        public static final String DATA_LISTED_SUCCESSFULLY = "Veri başarılı bir şekilde listelendi.";
        public static final String DATA_ADDED_SUCCESSFULLY = "Veri ekleme işlemi başarılı.";
        public static final String DATA_UPDATED_SUCCESSFULLY = "Brand güncelleme işlemi başarılı.";
        public static final String DATA_DELETED_SUCCESSFULLY = "Marka silme işlemi başarılı bir şekilde gerçekleşti, markaID: ";
        public static final String DATA_BROUGHT_SUCCESSFULLY = "Data Brought Successfully, dataId: ";
        public static final String DATA_DELETED_ERROR= "Marka silme işlemi başarısız.. ";
        public static final String BRAND_ID_NOT_FOUND = "Brand bulunamadı..";
    }
    public class ColorMessages{
        public static final String DATA_LISTED_SUCCESSFULLY = "Renkler başarılı bir şekilde listelendi.";
        public static final String DATA_ADDED_SUCCESSFULLY = "Renk ekleme işlemi başarılı.";
        public static final String DATA_UPDATED_SUCCESSFULLY = "Renk güncelleme işlemi başarılı.";
        public static final String DATA_DELETED_SUCCESSFULLY = "Renk deleted successfully, dataId: ";
        public static final String DATA_BROUGHT_SUCCESSFULLY = "Data Brought Successfully, dataId: ";
        public static final String DATA_DELETED_ERROR= "RENK silme işlemi başarısız.. ";


        public static final String COLOR_ID_NOT_FOUND = "Renk bulunamadı...";
    }
    public class CarMessages{
        public static final String DATA_LISTED_SUCCESSFULLY = "Araçlar başarılı bir şekilde listelendi.";
        public static final String DATA_ADDED_SUCCESSFULLY = "Araç ekleme işlemi başarılı.";
        public static final String DATA_UPDATED_SUCCESSFULLY = "Araç güncelleme işlemi başarılı.";
        public static final String DATA_DELETED_SUCCESSFULLY = "Araç deleted successfully, dataId: ";
        public static final String DATA_BROUGHT_SUCCESSFULLY = "Data Brought Successfully, dataId: ";
        public static final String DATA_DELETED_ERROR= "Araç silme işlemi başarısız.. ";

        public static final String DATA_GETBYID_SUCCESSFULLY = "Araç getirme başarılı..";
        public static final String CAR_ID_NOT_FOUND = "Araç bulunamadı...";

        public static final String DELIVERED_KILOMETER_CANNOT_LESS_THAN_RENTED_KILOMETER ="TESLİM EDİLEN KİLOMETRE KİRALANAN KİLOMETREDEN AZ OLAMAZ";
    }
    public class RentalCarMessages{
        public static final String RENTAL_CAR_ID_OR_CAR_ID_NOT_FOUND = "Araç idsi veya kiralama idsi bulunamadı";
    }
    public class CarImageUpload{
        public static final String CAR_IMAGE_UPLOAD_FAILED = "Resim yükleme işlemi başarısız oldu.";
    }
}
