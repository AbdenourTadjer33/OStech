<?php

namespace App\Enums;

enum OrderStatus: string
{
    case NewOrder = 'Nouvel commande';
    case Paid = 'Payé';
    case UnderProcess = 'En cours de traitement';
    case Finished = 'Fini';
    case Canceled = 'Annulé';
    case RefundRequested = 'Remboursement demandé';
    case ReturnedOrder = 'Commande retournée';
    case RefundedOrder = 'Commande remboursée';
}
