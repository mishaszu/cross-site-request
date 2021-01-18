use actix_cors::Cors;
use actix_web::{get, App, HttpResponse, HttpServer};
use serde::Serialize;

#[derive(Serialize)]
struct SendValue {
    value: String,
}

#[get("/api")]
async fn index() -> HttpResponse {
    HttpResponse::Ok().json(SendValue {
        value: "test value from be".to_string(),
    })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info,actix_server=info");
    env_logger::init();
    HttpServer::new(|| App::new().wrap(Cors::default()).service(index))
        .bind("localhost:4040")?
        .workers(4)
        .run()
        .await
}
