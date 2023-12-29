using Microsoft.EntityFrameworkCore;
using APIPRUEBAS.Models;
using System;
using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });
    // Your Swagger configuration goes here
    Console.WriteLine("Swagger configuration executed successfully.");
});



builder.Services.AddDbContext<DBAPIContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("cadenaSQL")));


builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

});


var misReglasCors = "ReglasCors";
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: misReglasCors, builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });

});


var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    
//}

app.UseSwagger();
app.UseSwaggerUI();


app.UseCors(misReglasCors);

app.UseAuthorization();

app.MapControllers();

app.Run();
