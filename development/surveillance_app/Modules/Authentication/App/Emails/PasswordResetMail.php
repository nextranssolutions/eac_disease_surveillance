<?php
namespace Modules\Authentication\App\Emails;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public $resetLink;

    /**
     * Create a new message instance.
     *
     * @param string $resetLink The reset link to include in the email
     * @return void
     */
    public function __construct($resetLink)
    {
        $this->resetLink = $resetLink;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->View('password_reset')
                    ->subject('Password Reset') // Set the email subject
                    ->with([
                        'resetLink' => $this->resetLink,
                    ]);
    }
}