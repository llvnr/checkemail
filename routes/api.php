<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'checkemail'
], function ($router) {

    Route::post('/check', function() {

        $email = request('email');
        $domainMain = explode('@', $email);
        $clientIP = request()->ip();
    
        // Initialize library class
        $mail = new VerifyEmail();
    
        // Set the timeout value on stream
        $mail->setStreamTimeoutWait(20);
    
        // Set debug output mode
        $mail->Debug= TRUE; 
        $mail->Debugoutput= 'html'; 
    
        // Set email address for SMTP request
        $mail->setEmailFrom('yuchiima@gmail.com');
    
        // Email to check
        $email = $email; 
    
        // Check if email is valid and exist
        if($mail->check($email)){ 

            Log::info("[CheckEmail] - Le service a lancé une vérification sur le domaine : '.$domainMain[1].' pour une adresse email. Résultat : Existe.");
    
            return response()->json([
                "status" => true,
                "message" => 'L\'adresse email <'.$email.'> existe !'
            ]);
            // echo 'Email &lt;'.$email.'&gt; is exist!'; 
        }elseif(verifyEmail::validate($email)){ 

            Log::info("[CheckEmail] - Le service a lancé une vérification sur le domaine : '.$domainMain[1].' pour une adresse email. Résultat : Valide mais existe pas.");
    
            return response()->json([
                "status" => "exist",
                "message" => 'L\'adresse email <'.$email.'> est valide, mais n\'existe pas !'
            ]);
            
        }else{ 
    
            Log::info("[CheckEmail] - Le service a lancé une vérification sur le domaine : '.$domainMain[1].' pour une adresse email. Résultat : Invalide et existe pas.");
    
            return response()->json([
                "status" => false,
                "message" => 'L\'adresse email <'.$email.'> n\'est pas valide et n\'existe pas !'
            ]);
        } 
    
    })->name('api.check');

});