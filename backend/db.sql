CREATE OR REPLACE FUNCTION next_id(OUT result bigint, seq text) AS $$
DECLARE
    our_epoch bigint := 1581692400000;
    seq_id bigint;
    now_millis bigint;
    shard_id int := 5;
BEGIN
    SELECT nextval(seq) % 1024 INTO seq_id;
    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    result := (now_millis - our_epoch) << 23;
    result := result | (shard_id <<10);
    result := result | (seq_id);
    
END;
    $$ LANGUAGE PLPGSQL;

-- Table tweets
drop table if exists tweets;
drop sequence if exists tweets_id_seq;
CREATE SEQUENCE tweets_id_seq;
create table tweets(
    id bigint NOT NULL DEFAULT next_id('tweets_id_seq') primary key,
    content text,
    owner text,
    retweet bigint,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    deleted_at timestamptz,
    FOREIGN KEY (retweet) REFERENCES tweets(id)
);