<!DOCTYPE html>
<html lang="es">
<head>
	<title>Register</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/fonts/iconic/css/material-design-iconic-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="/vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="/vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="/css/util.css">
	<link rel="stylesheet" type="text/css" href="/css/main.css">
<!--===============================================================================================-->
</head>
<body>
	
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">

				<form class="login100-form validate-form" method="POST" action="{{ route('register') }}">
					<span class="login100-form-title p-b-26">
						Registro al sistema
                    </span>
                    
                    @csrf

                    <div class="wrap-input100 validate-input" data-validate = "Campo requerido">
						<input class="input100" type="text" name="nombre">
                        <span class="focus-input100" data-placeholder="Nombre"></span>
                        @if ($errors->has('nombre'))
							<strong style="position: absolute; color: red;
								bottom: -25px; left: 10px; font-size: 15px;">
								{{ $errors->first('nombre') }}
							</strong>
                        @endif
					</div>

                    <div class="wrap-input100 validate-input" data-validate = "Campo requerido">
						<input class="input100" type="text" name="apellido">
						<span class="focus-input100" data-placeholder="Apellido"></span>
						@if ($errors->has('apellido'))
							<strong style="position: absolute; color: red;
								bottom: -25px; left: 10px; font-size: 15px;">
								{{ $errors->first('apellido') }}
							</strong>
                        @endif
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Campo requerido">
						<input class="input100" type="text" name="usuario">
						<span class="focus-input100" data-placeholder="Usuario"></span>
						@if ($errors->has('usuario'))
							<strong style="position: absolute; color: red;
								bottom: -25px; left: 10px; font-size: 15px;">
								{{ $errors->first('usuario') }}
							</strong>
                        @endif
					</div>

					<div class="wrap-input100 validate-input" data-validate="ingresar clave">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
						<input class="input100" type="password" name="password">
						<span class="focus-input100" data-placeholder="Clave"></span>
						@if ($errors->has('password'))
							<strong style="position: absolute; color: red;
								bottom: -25px; left: 10px; font-size: 15px;">
								{{ $errors->first('password') }}
							</strong>
                        @endif
                    </div>
                    
                    <div class="wrap-input100 validate-input" data-validate="ingresar clave">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
						<input class="input100" type="password" name="password_confirmation">
						<span class="focus-input100" data-placeholder="Repetir clave"></span>
					</div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn" type="submit">
								Registrar
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>
	
<!--===============================================================================================-->
	<script src="/vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="/vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="/vendor/bootstrap/js/popper.js"></script>
	<script src="/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="/vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="/vendor/daterangepicker/moment.min.js"></script>
	<script src="/vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="/vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
    <!-- <script src="/js/main.js"></script> -->
    
    <script>
        $('.input100').each(function(){
            $(this).on('blur', function(){
                if($(this).val().trim() != "") {
                    $(this).addClass('has-val');
                }
                else {
                    $(this).removeClass('has-val');
                }
            })    
        })
        var showPass = 0;
        $('.btn-show-pass').on('click', function(){
            if(showPass == 0) {
                $(this).next('input').attr('type','text');
                $(this).find('i').removeClass('zmdi-eye');
                $(this).find('i').addClass('zmdi-eye-off');
                showPass = 1;
            }
            else {
                $(this).next('input').attr('type','password');
                $(this).find('i').addClass('zmdi-eye');
                $(this).find('i').removeClass('zmdi-eye-off');
                showPass = 0;
            }
            
        });
    </script>

</body>
</html>