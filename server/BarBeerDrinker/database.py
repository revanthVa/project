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
            " SELECT h1.Drinkersname, bn1.totalprice FROM Billsnew bn1 JOIN Has h1 on bn1.transactionID = h1.BillstransactionID where bn1.Barsname = :name  ORDER BY bn1.totalprice desc  Limit 10;"
        )
        rs = con.execute(query, name=name)
        results = [dict(row) for row in rs]
        for r in results:
            r['totalprice'] = float(r['totalprice'])
        return results
def get_beers():
    with engine.connect() as con:
        rs = con.execute("Select name, manf from Beers")
        return[dict(row) for row in rs]
        
def find_beer(name):
    with engine.connect() as con:
        query = sql.text(
            "Select name, manf FROM Beers WHERE name = :name;"
        )
        rs = con.execute(query, name=name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)

def find_beer_top10Bars(name):
    with engine.connect() as con:
        query = sql.text(
            "SELECT e.Barsname, SUM(e.quantity) as BeersSold FROM (SELECT bo1.BillstransactionID, bo1.quantity, bo1.Itemsname, bn1.Barsname FROM Billsnew bn1 JOIN Bought bo1 ON bo1.BillstransactionID = bn1.transactionID) as e where e.Itemsname = :name GROUP BY Barsname ORDER By BeersSold desc LIMIT 10;"
        )
        rs = con.execute(query, name=name)
        results = [dict(row) for row in rs]
        for r in results:
            r['BeersSold'] = float(r['BeersSold'])
        return results