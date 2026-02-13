--
-- PostgreSQL database dump
--

\restrict 5UqCLGJNBgqFUi7onBp9pFcAOHnc9Iwi4b09s35JefrPPsdc2VGiyit4MfPwB0p

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: incidents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.incidents (
    title text CONSTRAINT incident_title_not_null NOT NULL,
    description text CONSTRAINT incident_description_not_null NOT NULL,
    creator text CONSTRAINT incident_creator_not_null NOT NULL,
    assignee text CONSTRAINT incident_assignee_not_null NOT NULL,
    category text CONSTRAINT incident_category_not_null NOT NULL,
    severity text CONSTRAINT incident_severity_not_null NOT NULL,
    service text CONSTRAINT incident_service_not_null NOT NULL,
    status text,
    tags text,
    created_at timestamp with time zone DEFAULT now() CONSTRAINT incident_created_at_not_null NOT NULL,
    updated_at timestamp with time zone DEFAULT now() CONSTRAINT incident_updated_at_not_null NOT NULL,
    id integer CONSTRAINT incident_id_not_null NOT NULL
);


ALTER TABLE public.incidents OWNER TO postgres;

--
-- Name: incident_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.incident_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.incident_id_seq OWNER TO postgres;

--
-- Name: incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.incident_id_seq OWNED BY public.incidents.id;


--
-- Name: incidents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incidents ALTER COLUMN id SET DEFAULT nextval('public.incident_id_seq'::regclass);


--
-- Data for Name: incidents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.incidents (title, description, creator, assignee, category, severity, service, status, tags, created_at, updated_at, id) FROM stdin;
VM down	VM is unhealthy	parth	Shubham	VM	P0	VM	Acknowledged	infra,vmware	2026-02-11 19:15:50.779977+05:30	2026-02-12 17:35:34.750338+05:30	3
Login API timeou	Users unable to login due to high latency	None	Shubham	Application	P1	auth-service	Investigating	auth,latency,login	2026-02-12 18:14:24.385167+05:30	2026-02-12 18:14:24.385167+05:30	9
Database connection spike	Too many postgres connections observed	None	Parth	Infrastructure	P2	order-service	Acknowledged	postgres,connections	2026-02-12 18:26:18.835164+05:30	2026-02-12 18:26:18.835164+05:30	10
Frontend blank screen	React UI not rendering dashboard widgets	None	Arjun	Application	P0	frontend-ui	Open	react,ui	2026-02-12 18:27:52.046153+05:30	2026-02-12 18:27:52.046153+05:30	11
Inventory sync delay	Kafka lag causing delayed stock updates	None	Shubham	Application	P3	inventory-service	Resolved	kafka,lag	2026-02-12 18:30:16.483494+05:30	2026-02-12 18:30:16.483494+05:30	12
Payment webhook failure	Stripe webhook not reaching backend	None	Shubham	Application	P1	payment-service	Investigating	stripe,webhook	2026-02-12 18:34:20.907871+05:30	2026-02-12 18:34:20.907871+05:30	13
Search API slow queries	Elastic queries exceeding SLA	None	Parth	Database	P2	search-service	Acknowledged	elastic,query	2026-02-12 18:37:34.054444+05:30	2026-02-12 18:37:34.054444+05:30	14
Notification queue backlog	RabbitMQ queue depth increasing rapidly	None	Dhananjay	Infrastructure	P2	notification-service	Open	rabbitmq,queue	2026-02-12 18:38:57.168829+05:30	2026-02-12 18:38:57.168829+05:30	15
API Gateway 502 errors	Gateway returning intermittent bad gateway	None	Arjun	Network	P3	api-gateway	Closed	nginx,gateway	2026-02-12 18:40:30.837855+05:30	2026-02-12 18:40:30.837855+05:30	16
Monitoring alerts missing	Prometheus alerts not firing correctly	None	Shubham	Infrastructure	P1	monitoring-stack	Open	prometheus,alerts	2026-02-12 18:41:58.036462+05:30	2026-02-12 18:41:58.036462+05:30	17
\.


--
-- Name: incident_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.incident_id_seq', 17, true);


--
-- Name: incidents incident_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incidents
    ADD CONSTRAINT incident_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict 5UqCLGJNBgqFUi7onBp9pFcAOHnc9Iwi4b09s35JefrPPsdc2VGiyit4MfPwB0p

