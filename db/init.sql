--
-- PostgreSQL database dump
--

\restrict Q2JSxGdeHPYOnmyLYpIZoVpADl797cqDLMSF2rZR9gwJCpdxFel0aizCjP9HOZH

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA drizzle;


--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: transactionType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."transactionType" AS ENUM (
    'INCOME',
    'EXPENSE',
    'SAVINGS'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: -
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: -
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: -
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: profile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profile (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    current_savings numeric(10,2) NOT NULL,
    goal_savings numeric(10,2) NOT NULL,
    job_title text NOT NULL,
    age smallint NOT NULL,
    monthly_income numeric(10,2) NOT NULL,
    first_name character varying(250) NOT NULL,
    last_name character varying(250) NOT NULL
);


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    transaction_type public."transactionType" NOT NULL,
    category text NOT NULL,
    amount numeric(10,2) NOT NULL,
    description character varying(256),
    date date NOT NULL,
    "time" time without time zone NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(255) NOT NULL,
    hashed_password character varying(255) CONSTRAINT users_password_hash_not_null NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    account_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_profile_complete boolean DEFAULT false NOT NULL
);


--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: -
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: -
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	b503c5cfbe165c03e10e12fb5b578291debac141ae381ce4081d9c9e907c5945	1783352603999
2	dda62e2c4fa0a578d1b3356ea288a0fe3f8019f4e4faf744820d0f15bf078fb1	1786711306302
3	d2c5ab163cbd290ba1f4f234f07bb6c5ba2807782c36c589b0e6e294b3059bb8	1786714014708
4	e2cdf9924b0b4f3f9a7f28c8cbeb8baf1455d8519a3313b7a712058a20273751	1786772170296
5	62aa7ea368936d8e8fcfbfe4c891f52e7ccd56d995d0fd99c734d41ffc39b78a	1786776072720
6	192583941e4191c6d3fbbc18fdbb96949a8589234ec2f400035ccaea1712d73c	1786901677467
7	0a536657b767fce5d8f5548eee5ab7b5dc8d7e0a2c12a312bc6e2c01413f6a8b	1787587929702
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.profile (id, user_id, current_savings, goal_savings, job_title, age, monthly_income, first_name, last_name) FROM stdin;
20502a34-9aa4-4b0b-9d54-5c6148be47ec	581dd0a0-b72b-4b10-a012-c4b97815d3f9	20000.00	50000.00	Tite	21	10000.00	Marc Lawrence	Tamayo
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.transactions (id, user_id, transaction_type, category, amount, description, date, "time") FROM stdin;
8ba09b3b-f7d9-4eec-9de1-2e935c791c58	581dd0a0-b72b-4b10-a012-c4b97815d3f9	INCOME	Salary	10000.00	Tite	2026-10-25	22:22:00
7d51f369-614a-4ff8-9533-17d1e3c6ab96	581dd0a0-b72b-4b10-a012-c4b97815d3f9	EXPENSE	Transportation	150.00		2026-10-25	22:22:00
2bac1dc7-ef04-4a7a-86ff-64a2fe1cf999	581dd0a0-b72b-4b10-a012-c4b97815d3f9	INCOME	Salary	150.00		2026-10-25	22:38:00
5c9fa2c8-8b88-4158-a109-1e93cdc1a6ce	581dd0a0-b72b-4b10-a012-c4b97815d3f9	INCOME	Salary	15000.00	TIte	2026-10-25	22:38:00
0e888af6-6469-4796-a5ee-59d20871e954	581dd0a0-b72b-4b10-a012-c4b97815d3f9	EXPENSE	Transportation	15000.00	TIte	2026-10-25	22:38:00
6f3f5f81-66b9-4acb-ace8-fe6abc149d9d	581dd0a0-b72b-4b10-a012-c4b97815d3f9	SAVINGS	Bank	15000.00	TIte	2026-10-25	22:38:00
58c04fec-5e61-4f4c-a0b6-554cb417a03b	581dd0a0-b72b-4b10-a012-c4b97815d3f9	SAVINGS	Bank	15000.00	TIte	2026-10-25	22:38:00
5a0bd32e-5469-41c8-a9f8-aef4fe56eb87	581dd0a0-b72b-4b10-a012-c4b97815d3f9	INCOME	Salary	15000.00		2026-10-27	16:29:00
401496d3-dea2-4878-add8-a79a1c43b576	581dd0a0-b72b-4b10-a012-c4b97815d3f9	EXPENSE	Transportation	15000.00	asdfasdfasdfadfadfadfadsafdadsf	2026-10-27	16:33:00
51fe675a-0e71-4a7f-91ff-2c6c51fc5c2d	581dd0a0-b72b-4b10-a012-c4b97815d3f9	EXPENSE	Food & Dining	1000.00	Kumain ng tite	2026-10-27	17:30:00
8031b7c8-d1ab-4aa1-8b5e-049ad2004281	581dd0a0-b72b-4b10-a012-c4b97815d3f9	EXPENSE	Bills	1000.00	Bumili ng tite	2026-10-27	17:30:00
a73623bd-dc34-4e5b-9aca-ecb333842a4a	581dd0a0-b72b-4b10-a012-c4b97815d3f9	INCOME	Investment	11111.00	Tite	2026-10-27	18:30:00
f890b5b5-b718-4990-9914-78f611dc2910	581dd0a0-b72b-4b10-a012-c4b97815d3f9	EXPENSE	Food & Dining	1000.00	Grocery	2026-10-28	22:57:00
41ba6d5f-7d7f-4f5a-8c80-24c606585fa3	581dd0a0-b72b-4b10-a012-c4b97815d3f9	EXPENSE	Shopping	1000.00	Grocery	2026-10-28	22:57:00
cc02af82-ebae-438c-9e72-82ecfbad6547	581dd0a0-b72b-4b10-a012-c4b97815d3f9	INCOME	Salary	10000.00	Burat	2026-10-30	18:32:00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, hashed_password, is_active, account_created, is_profile_complete) FROM stdin;
fd4b8469-5ccb-4831-ae57-d3ae18ead865	tite@gmail.com	Tite	t	2026-09-27 22:02:43.500294+08	f
af859495-7a0e-463a-b190-5a57fbd871cc	asdf@gmail.com	$2a$10$pyvImAUG4CrI1rF3xBGOPuFJV45Q0o9V2rESvldJ909Ht0Hr23c0S	t	2026-09-27 22:56:55.256777+08	f
49885b9a-b8ee-4822-838d-450e38bdd07b	zxcv@gmail.com	$2a$10$ZSvx.05WPQWWTjxSSL.fAOcCmiSCLQ/xDlp1JR.CYDJ5uekPE2Age	t	2026-09-28 17:44:32.587149+08	f
581dd0a0-b72b-4b10-a012-c4b97815d3f9	marctamayo027@gmail.com	$2a$10$gU8u5CWpU6uKEaqYvzNkkObxG5HySHwKmPBeFgBD/eC7DM94vTlSO	t	2026-10-04 12:36:32.598755+08	t
0b6991b2-f49c-4546-a69d-244114fc1aa7	marctamayo9@gmail.com	$2a$10$XQGkMB8R2dSO2l3M/P0aW.mYcMQDkKd3l3J2ZyyZcYRFhkDVHUq/2	t	2026-10-27 19:20:51.291973+08	f
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: -
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 7, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: -
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- Name: profile profile_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_user_id_unique UNIQUE (user_id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: transactions_user_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transactions_user_id_idx ON public.transactions USING btree (user_id);


--
-- Name: profile profile_user_id_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: transactions transactions_user_id_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Q2JSxGdeHPYOnmyLYpIZoVpADl797cqDLMSF2rZR9gwJCpdxFel0aizCjP9HOZH

