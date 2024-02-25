<?php

namespace App\Enums;

enum ShippingType: string
{
    case cost_home = "tarif a domicile";
    case cost_stop_desk = "tarif stop-desk";
}
