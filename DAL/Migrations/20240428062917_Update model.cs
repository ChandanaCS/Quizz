using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class Updatemodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizQuestions_QuizzifyCategories_CategoryId",
                table: "QuizQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizQuestions_QuizzifyQuestions_QuestionId",
                table: "QuizQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizQuestions_QuizzifyQuiz_QuizId",
                table: "QuizQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizzifyQuestions_QuizzifyCategories_CategoryId",
                table: "QuizzifyQuestions");

            migrationBuilder.DropIndex(
                name: "IX_QuizzifyQuestions_CategoryId",
                table: "QuizzifyQuestions");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "QuizzifyQuestions",
                newName: "OrganisationId");

            migrationBuilder.AlterColumn<bool>(
                name: "IsEnable",
                table: "QuizzifyQuiz",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: true);

            migrationBuilder.AlterColumn<bool>(
                name: "AutoValidation",
                table: "QuizzifyQuiz",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "QuizzifyQuestions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "QuizCategory",
                table: "QuizzifyQuestions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizQuestions_QuizzifyCategories_CategoryId",
                table: "QuizQuestions",
                column: "CategoryId",
                principalTable: "QuizzifyCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuizQuestions_QuizzifyQuestions_QuestionId",
                table: "QuizQuestions",
                column: "QuestionId",
                principalTable: "QuizzifyQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuizQuestions_QuizzifyQuiz_QuizId",
                table: "QuizQuestions",
                column: "QuizId",
                principalTable: "QuizzifyQuiz",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizQuestions_QuizzifyCategories_CategoryId",
                table: "QuizQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizQuestions_QuizzifyQuestions_QuestionId",
                table: "QuizQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizQuestions_QuizzifyQuiz_QuizId",
                table: "QuizQuestions");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "QuizzifyQuestions");

            migrationBuilder.DropColumn(
                name: "QuizCategory",
                table: "QuizzifyQuestions");

            migrationBuilder.RenameColumn(
                name: "OrganisationId",
                table: "QuizzifyQuestions",
                newName: "CategoryId");

            migrationBuilder.AlterColumn<bool>(
                name: "IsEnable",
                table: "QuizzifyQuiz",
                type: "bit",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "AutoValidation",
                table: "QuizzifyQuiz",
                type: "bit",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.CreateIndex(
                name: "IX_QuizzifyQuestions_CategoryId",
                table: "QuizzifyQuestions",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizQuestions_QuizzifyCategories_CategoryId",
                table: "QuizQuestions",
                column: "CategoryId",
                principalTable: "QuizzifyCategories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizQuestions_QuizzifyQuestions_QuestionId",
                table: "QuizQuestions",
                column: "QuestionId",
                principalTable: "QuizzifyQuestions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizQuestions_QuizzifyQuiz_QuizId",
                table: "QuizQuestions",
                column: "QuizId",
                principalTable: "QuizzifyQuiz",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizzifyQuestions_QuizzifyCategories_CategoryId",
                table: "QuizzifyQuestions",
                column: "CategoryId",
                principalTable: "QuizzifyCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
