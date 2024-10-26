using Microsoft.EntityFrameworkCore;
using NekretnineZellAmSee.Data;
using NekretnineZellAmSee.Mapping;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//************************************************************************************************************
builder.Services.AddCors(options => // Replace this line
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

//************************************************************************************************************

// dodavanje baze podataka
builder.Services.AddDbContext<NekretnineZellAmSeeContext>(
    opcije =>
{
    opcije.UseSqlServer(builder.Configuration.GetConnectionString("NekretnineContext"));
});

//************************************************************************************************************

// automapper
builder.Services.AddAutoMapper(typeof(NekretnineZellAmSeeMappingProfile));

//************************************************************************************************************

// SECURITY
//builder.Services.AddEdunovaSecurity();
//builder.Services.AddAuthorization();
// END SECURITY

//************************************************************************************************************

var app = builder.Build();

//************************************************************************************************************

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
// {
app.UseSwagger();
app.UseSwaggerUI(o =>
{

    o.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
    o.EnableTryItOutByDefault();
    o.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);

});
//}

//************************************************************************************************************

app.UseHttpsRedirection();

//************************************************************************************************************

// SECURITY
//app.UseAuthentication();
//app.UseAuthorization();
// ENDSECURITY

//************************************************************************************************************

app.MapControllers();

//************************************************************************************************************

// za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

//************************************************************************************************************

app.UseCors("CorsPolicy");
// završio za potrebe produkcije

//************************************************************************************************************

app.Run();