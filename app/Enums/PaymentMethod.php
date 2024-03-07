<?php


namespace App\Enums;

enum PaymentMethod: string
{
    case cash_on_delivery = "Paiement à la livraison";
    case transfer = "Virement";
}