<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MobileController;
use App\Http\Controllers\Api\LabtopController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\ProductController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Crud For Mobile
Route::get('mobiles',[MobileController::class,'index']);
Route::get('mobiles/{mobile}',[MobileController::class,'show']);
Route::post('mobiles',[MobileController::class,'store']);
Route::post('/mobiles/{mobile}',[MobileController::class,'update']);
Route::delete('/mobiles/delete/{mobile}',[MobileController::class,'destroy']);


// Crud For Labtop
Route::get('labtops',[LabtopController::class,'index']);
Route::get('labtops/{labtop}',[LabtopController::class,'show']);
Route::post('labtops',[LabtopController::class,'store']);
Route::post('/labtops/{labtop}',[LabtopController::class,'update']);
Route::delete('/labtops/delete/{labtop}',[LabtopController::class,'destroy']);

// Crud For Product
Route::get('products',[ProductController::class,'index']);
Route::get('products/{product}',[ProductController::class,'show']);
Route::post('products',[ProductController::class,'store'])->middleware(['auth:sanctum' , 'admin']);
Route::post('products/sell/{product}',[ProductController::class,'sell'])->middleware('auth:sanctum');
Route::post('products/rate/{product}',[ProductController::class,'updateRate'])->middleware('auth:sanctum');
Route::post('/products/{product}',[ProductController::class,'update'])->middleware(['auth:sanctum' , 'admin']);
Route::delete('/products/delete/{product}',[ProductController::class,'destroy'])->middleware(['auth:sanctum' , 'admin']);


// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login' ,[AuthController::class , 'login'] );
Route::get('/logout' , [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/users' , [AuthController::class, 'index'])->middleware(['auth:sanctum' , 'admin']);
Route::delete('/user/delete/{user}',[AuthController::class,'destroy'])->middleware(['auth:sanctum' , 'admin']);
Route::post('/user/updateemail/{user}' , [AuthController::class , 'updateUserEmailAndUsername'])->middleware('auth:sanctum');
Route::post('/user/updatepassword/{user}' , [AuthController::class , 'updateUserPassword'])->middleware('auth:sanctum');
Route::post('/user/updatecontact/{user}' , [AuthController::class , 'updateUserPhoneAndLocation'])->middleware('auth:sanctum');
