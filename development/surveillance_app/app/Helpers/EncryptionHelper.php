<?php

namespace app\Helpers;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;

class EncryptionHelper
{
    /**
     * Encrypt data (supports strings and arrays)
     * 
     * @param string|array $data Data to encrypt
     * @return string Encrypted string
     */
    public static function encrypt_data($data)
    {
        if (empty($data)) {
            return "";
        }

        try {
            // Convert arrays to JSON for consistent encryption
            if (is_array($data)) {
                $data = json_encode($data, JSON_UNESCAPED_UNICODE);
            }

            // Ensure data is a string
            $text = (string)$data;

            // Encrypt with serialization disabled
            $encrypted = Crypt::encrypt($text, false);
            return $encrypted;
        } catch (\Throwable $e) {
            Log::error("Encryption error: " . $e->getMessage(), [
                'data_type' => gettype($data)
            ]);
            return "";
        }
    }
    
    /**
     * Decrypt data (returns string or array)
     * 
     * @param string $data Encrypted data
     * @return string|array|null Decrypted data
     */
    public static function decrypt_data($data)
    {
        if (empty($data)) {
            return null;
        }

        try {
            // Decrypt with serialization disabled
            $decrypted = Crypt::decrypt($data, false);

            // Try to parse as JSON, fallback to string
            $result = json_decode($decrypted, true);
            
            // If json_decode fails, return original decrypted string
            return $result === null ? $decrypted : $result;
        } catch (\Exception $e) {
            Log::error("Decryption error: " . $e->getMessage());
            return null;
        }
    }
}