using System.ComponentModel.DataAnnotations;

namespace NekretnineZellAmSee.Models.DTO
{
    
    
        /// <summary>
        /// DTO klasa koja predstavlja sliku.
        /// </summary>
        /// <param name="Base64">Base64 zapis slike.</param>
        public record SlikaDTO([Required(ErrorMessage = "Base64 zapis slike obavezno")] string Base64);



    
}
