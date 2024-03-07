<?php

namespace App\Enums;

enum ShippingType: string
{
    case cost_home = "Tarif à domicile";
    case cost_stop_desk = "Tarif stop-desk";
}
