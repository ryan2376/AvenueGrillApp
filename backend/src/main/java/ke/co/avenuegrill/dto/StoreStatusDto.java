package ke.co.avenuegrill.dto;

public record StoreStatusDto(
        boolean acceptingOrders,
        String open,
        String close,
        boolean isOpenNow,
        long minOrderKes,
        long defaultDeliveryFeeKes,
        String timezone) {
}
