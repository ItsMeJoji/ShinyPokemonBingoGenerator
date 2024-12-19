using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ShinyPokemonBingoGenerator.Models;

namespace ShinyPokemonBingoGenerator.Controllers;

public class BingoCardController : Controller
{
    private readonly ILogger<BingoCardController> _logger;

    public BingoCardController(ILogger<BingoCardController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Generate()
    {
        var bingoCard = new BingoCardModel(){
            ImageUrls = new string[5,5]
        };

        Random random = new Random();

        for (int i = 0; i < 5; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    int intPokemonNumber = random.Next(1, 251);
                    string strPokemonNumber = intPokemonNumber.ToString().PadLeft(3, '0');
                    bingoCard.ImageUrls[i, j] = "https://serebii.net/Shiny/Crystal/" + strPokemonNumber + ".png";
                }
            }

        ViewBag.ShowTable = true;
        return View("Index", bingoCard);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}