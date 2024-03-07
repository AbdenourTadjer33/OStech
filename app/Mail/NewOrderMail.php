<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewOrderMail extends Mailable
{
    use Queueable, SerializesModels;


    public $order;
    public $orderProducts;
    public $orderLink;

    /**
     * Create a new message instance.
     */
    public function __construct($order, $orderProducts, $orderLink)
    {
        $this->order = $order;
        $this->orderProducts = $orderProducts;
        $this->orderLink = $orderLink;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Récapitulatif de votre commande {$this->order?->ref}",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: "mail.new_order",
            markdown: "",
            with: [
                'order' => $this->order,
                'orderProducts' => $this->orderProducts,
                'orderLink' => $this->orderLink,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
