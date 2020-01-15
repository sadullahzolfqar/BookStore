using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class DbInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "kategori",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    sKodu = table.Column<string>(maxLength: 10, nullable: true),
                    sAdi = table.Column<string>(maxLength: 60, nullable: false),
                    dtCreate = table.Column<DateTime>(nullable: false),
                    dtLastUpdate = table.Column<DateTime>(nullable: false),
                    isDelet = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kategori", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "yazar",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    sAdi = table.Column<string>(maxLength: 60, nullable: false),
                    sSoyadi = table.Column<string>(maxLength: 60, nullable: false),
                    sTckn = table.Column<string>(maxLength: 11, nullable: true),
                    sYazarHakkinda = table.Column<string>(nullable: true),
                    dtDogumTarih = table.Column<DateTime>(nullable: false),
                    dtCreate = table.Column<DateTime>(nullable: false),
                    dtLastUpdate = table.Column<DateTime>(nullable: false),
                    isDelet = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_yazar", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "kitap",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    sKitapAdi = table.Column<string>(maxLength: 120, nullable: false),
                    sISBN = table.Column<string>(maxLength: 13, nullable: false),
                    sAciklama = table.Column<string>(maxLength: 200, nullable: false),
                    dtYayinTarihi = table.Column<DateTime>(nullable: false),
                    ldKitapFiyat = table.Column<decimal>(nullable: false),
                    KategoriId = table.Column<int>(nullable: true),
                    YazarId = table.Column<int>(nullable: true),
                    dtCreate = table.Column<DateTime>(nullable: false),
                    dtLastUpdate = table.Column<DateTime>(nullable: false),
                    isDelet = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kitap", x => x.Id);
                    table.ForeignKey(
                        name: "FK_kitap_kategori_KategoriId",
                        column: x => x.KategoriId,
                        principalTable: "kategori",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_kitap_yazar_YazarId",
                        column: x => x.YazarId,
                        principalTable: "yazar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_kitap_KategoriId",
                table: "kitap",
                column: "KategoriId");

            migrationBuilder.CreateIndex(
                name: "IX_kitap_YazarId",
                table: "kitap",
                column: "YazarId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "kitap");

            migrationBuilder.DropTable(
                name: "kategori");

            migrationBuilder.DropTable(
                name: "yazar");
        }
    }
}
