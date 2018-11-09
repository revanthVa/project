from sqlalchemy import create_engine
from sqlalchemy import sql
from BarBeerDrinker import config

engine = create_engine(config.database_uri)

def get_bars():
    with engine.connect() as con:
        rs = con.execute("SELECT name, license, city, phone, addr, state FROM Bars")
        return[dict(row) for row in rs]
def find_bar(name):
    with engine.connect() as con:
        query = sql.text(
            "Select name, license, city, phone ,addr, state FROM Bars WHERE name = :name;"
        )

        rs = con.execute(query, name=name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)
def find_bar_top10spenders(name):
    with engine.connect() as con:
        query = sql.text(
            " SELECT bn1.transactionID, h1.Drinkersname, bn1.totalprice FROM Billsnew bn1 JOIN Has h1 on bn1.transactionID = h1.BillstransactionID where bn1.Barsname = :name  ORDER BY bn1.totalprice desc  Limit 10;"
        )
        rs = con.execute(query, name=name)
        results = [dict(row) for row in rs]
        for r in results:
            r['totalprice'] = float(r['totalprice'])
        return results