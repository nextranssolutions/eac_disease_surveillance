@extends('sysadministration::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('sysadministration.name') !!}</p>
@endsection
