@extends('configurations::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('configurations.name') !!}</p>
@endsection
